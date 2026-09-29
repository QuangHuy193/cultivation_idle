import { realmService } from "./realm.service";
import { mapService } from "./map.service";
import { skinService } from "./skin.service";
import { classService } from "./class.service";
import { mailboxService } from "./mailbox.service";
import { dailyLoginService } from "./dailyLogin.service";

// tải các phần khác của game
export const init = async (characterId: string) => {
  await Promise.allSettled([
    skinService.getSkins(),
    classService.getClasses(),
    classService.getCharacterClassMisions(characterId),
    mapService.getMaps(),
    mailboxService.getMailboxes(characterId),
    dailyLoginService.getDailyLogin(),
    realmService.getRealms(),
  ]);
};
