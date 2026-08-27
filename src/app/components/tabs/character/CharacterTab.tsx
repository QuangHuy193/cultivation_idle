import TuiDoTab from "./Inventory";
import SplitLayout from "../../layout/SplitLayout";
import NhanVat from "./Character";

export default function CharacterTab() {
  
  return (
    <SplitLayout top={<NhanVat/>} bottom={<TuiDoTab/>}/>
  )
}
