import Inventory from "./Inventory";
import SplitLayout from "../../layout/SplitLayout";
import NhanVat from "./Character";

export default function CharacterTab() {
  return <SplitLayout top={<NhanVat />} bottom={<Inventory />} />;
}
