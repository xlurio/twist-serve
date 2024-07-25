import OrganizationListItem from '@/components/organizations/OrganizationListItem';
import {
  Container,
  List,
  Stack,
} from '@mui/material';

const DUMMY_DATA = [
  {
    id: 1,
    avatar:
      'https://static.wixstatic.com/media/' +
      'c526a9_1f60b3212b9e48688b0656e726cf8440~mv2.png/v1/fill/' +
      'w_211,h_211,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/offical_seal.png',
    name: 'American Tennis Association',
  },
  {
    id: 2,
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/thumb/6/68/' +
      'Asian_Tennis_Fedration%27s_official_logo.png/' +
      '220px-Asian_Tennis_Fedration%27s_official_logo.png',
    name: 'Asian Tennis Federation',
  },
  {
    id: 3,
    avatar:
      'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/' +
      'NATF_Logo.jpg/85px-NATF_Logo.jpg',
    name: 'Netherlands Antilles Tennis Federation',
  },
];

/**
 * List of organizations related to the player
 */
export default function MyOrganizations(): JSX.Element {
  return (
    <Container>
      <Stack>
        <h1>My Organizations</h1>
        <List>
          {DUMMY_DATA.map(regulatorData => (
            <OrganizationListItem
              key={regulatorData.id}
              avatar={regulatorData.avatar}
              name={regulatorData.name}
            />
          ))}
        </List>
      </Stack>
    </Container>
  );
}
