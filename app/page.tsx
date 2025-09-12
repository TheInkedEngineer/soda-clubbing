import Client from './home.client';

export default async function Page() {
  // Static content; no remote fetches
  const partyText = 'Next Party Coming Soon';
  const showBuyTicketsButton = false;
  return <Client partyText={partyText} showBuyTicketsButton={showBuyTicketsButton} />;
}
