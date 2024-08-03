'use server';
import {redirect} from 'next/navigation';
import {getMessageForRequestError} from '../lib/services';
import {postPlayers, postToken} from '@/lib/adapters';
import {cookies} from 'next/headers';
import dayjs from 'dayjs';
import {AxiosError} from 'axios';
import {createTournament} from '@/lib/services/http/tournaments';
import { BackendResponse } from '@/types/http/base';
import { CreatePlayerRequest, BestHand, Backhand } from '@/types/http/players';
import { GetTokenRequest } from '@/types/http/token';
import { CourtSurface } from '@/types/http/tournaments';

export async function loginFromFormAction(
  _: {errorMessage: string},
  formData: FormData
) {
  try {
    await _loginOnServerSide({
      email: formData.get('email') as unknown as string,
      password: formData.get('password') as unknown as string,
      rememberMe: formData.get('rememberMe') as unknown as boolean | undefined,
    });
  } catch (error) {
    console.trace(error);
    return {
      errorMessage: getMessageForRequestError(error),
    };
  }
  redirect('/');
}

export async function createTournamentFromFormAction(
  _: {errorMessage: string},
  formData: FormData
) {
  let pathToRedirect = '/tournaments/';

  try {
    const newTournament = await createTournament(
      _makeCreateTournamentPayloadFromFormData(formData)
    );
    const tournamentId = newTournament ? newTournament.id : null;
    pathToRedirect = tournamentId
      ? `/tournaments/${tournamentId}`
      : pathToRedirect;
  } catch (error) {
    console.trace(error);
    return {
      errorMessage: getMessageForRequestError(error),
    };
  }

  redirect(pathToRedirect);
}

function _makeCreateTournamentPayloadFromFormData(formData: FormData) {
  const avatars = (formData.get('avatar') || []) as unknown as File[];
  return {
    name: formData.get('name') as unknown as string,
    avatar: avatars.length > 0 ? avatars[0] : null,
    country: formData.get('country') as unknown as string,
    state_province: formData.get('state_province') as unknown as string,
    city: formData.get('city') as unknown as string,
    neighborhood: formData.get('neighborhood') as unknown as string,
    street: formData.get('street') as unknown as string,
    building_number: formData.get('building_number') as unknown as number,
    complement: formData.get('complement') as unknown as string,
    instalation: formData.get('instalation') as unknown as string,
    start_date: formData.get('start_date') as unknown as string,
    end_date: formData.get('end_date') as unknown as string,
    surface: formData.get('surface') as unknown as CourtSurface,
    slots: formData.get('slots') as unknown as number,
  };
}

export async function registerFromFormAction(
  _: {errorMessage: string},
  formData: FormData
) {
  const passwordDoesntMatch =
    formData.get('password') !== formData.get('password2');

  if (passwordDoesntMatch) {
    return {errorMessage: "Passwords don't match"};
  }

  return await _submitRegisterForm(formData);
}

async function _submitRegisterForm(formData: FormData) {
  try {
    await postPlayers(_makeRegisterPayloadFromFormData(formData));
  } catch (error) {
    console.trace(error);
    console.error((error as AxiosError<BackendResponse>).response?.data.data);
    return {
      errorMessage: getMessageForRequestError(error),
    };
  }

  return await _loginOrRedirect(formData);
}

function _makeRegisterPayloadFromFormData(
  formData: FormData
): CreatePlayerRequest {
  const avatarFiles = formData.get('avatar') as unknown as File[];

  return {
    avatar: avatarFiles.length > 0 ? avatarFiles[0] : null,
    email: formData.get('email') as string,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string,
    password: formData.get('password') as string,
    date_of_birth: dayjs(
      formData.get('date_of_birth') as unknown as string
    ).format('YYYY-MM-DD'),
    hometown_country: formData.get('hometown_country') as string,
    hometown_state_province: formData.get('hometown_state_province') as string,
    hometown_city: formData.get('hometown_city') as string,
    weight: formData.get('weight') as string,
    height: formData.get('height') as string,
    best_hand: formData.get('best_hand') as BestHand,
    backhand: formData.get('backhand') as Backhand,
  };
}

async function _loginOrRedirect(formData: FormData) {
  let wasLoginSuccessful = false;

  try {
    await _loginOnServerSide({
      email: formData.get('email') as unknown as string,
      password: formData.get('password') as unknown as string,
    });
    wasLoginSuccessful = true;
  } catch (error) {
    console.trace(error);
    console.error((error as AxiosError<BackendResponse>).response?.data.data);
    wasLoginSuccessful = false;
  }

  wasLoginSuccessful ? redirect('/') : redirect('/login/');
  return {
    errorMessage: '',
  };
}

async function _loginOnServerSide({
  email,
  password,
  rememberMe,
}: {
  rememberMe?: boolean;
} & GetTokenRequest) {
  const response = await postToken({email, password});
  if (rememberMe) {
    cookies().set({
      name: 'refresh',
      value: response.data.data.access,
      expires: new Date(response.data.data.lifetime),
    });
  }

  cookies().set('token', response.data.data.access);
  cookies().set('role', response.data.data.role);
}
