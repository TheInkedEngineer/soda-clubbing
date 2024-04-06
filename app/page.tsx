import { fetchLatestPartyInfo, getPartyDisplayText } from '../src/logic/partyInfo+query.tsx';
import Client from './home.client';

export default async function Page() {
  let partyText = 'Next Party Coming Soon';
  let showBuyTicketsButton = false;

  try {
    const partyInfo = await fetchLatestPartyInfo();
    if (partyInfo) {
      partyText = getPartyDisplayText(partyInfo);
      const currentDate = new Date();
      const partyDate = partyInfo.date ? new Date(partyInfo.date) : null;
      showBuyTicketsButton = !!(partyDate && partyDate >= currentDate && partyInfo.showBuyTicketsButton);
    }
  } catch (e) {
    // leave defaults
  }

  return <Client partyText={partyText} showBuyTicketsButton={showBuyTicketsButton} />;
}
