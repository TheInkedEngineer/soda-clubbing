import { client } from './shopify/client';

// Define types for clarity and type safety
type PartyInfo = {
  date: string | null;
  showBuyTicketsButton: boolean;
};

const PARTY_INFO_QUERY = `
query {
  metaobjects(type: "party_info", first: 1, reverse: true) {
    edges {
      node {
        fields {
          key
          value
        }
      }
    }
  }
}
`;

export const fetchLatestPartyInfo = async (): Promise<PartyInfo | null> => {
  const response = await fetch(client.getStorefrontApiUrl(), {
    method: 'POST',
    headers: client.getPrivateTokenHeaders(),
    body: JSON.stringify({
      query: PARTY_INFO_QUERY,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch party info');
  }

  const json = await response.json();
  const metaobject = json.data.metaobjects.edges[0]?.node.fields;

  if (!metaobject) {
    return null;
  }

  const fields = metaobject.reduce((acc: Record<string, string>, field: { key: string; value: string }) => {
    acc[field.key] = field.value;
    return acc;
  }, {});

  return {
    date: fields.date || null,
    showBuyTicketsButton: fields.show_buy_tickets_button === 'true',
  };
};

export const getPartyDisplayText = (partyInfo: PartyInfo): string => {
  if (!partyInfo.date) {
    return 'Prossimo Party Coming Soon';
  }

  const partyDate = new Date(partyInfo.date);
  const currentDate = new Date();

  if (isNaN(partyDate.getTime()) || partyDate < currentDate) {
    return 'Prossimo Party Coming Soon';
  }

  const day = String(partyDate.getDate()).padStart(2, '0');
  const month = String(partyDate.getMonth() + 1).padStart(2, '0');
  const year = String(partyDate.getFullYear()).slice(-2);

  return `Prossimo Party ${day}.${month}.${year}`;
};

// Removed unused: isTicketSellingOnline
