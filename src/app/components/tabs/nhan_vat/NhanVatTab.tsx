import TuiDoTab from "./TuiDo";
import SplitLayout from "../../layout/SplitLayout";
import NhanVat from "./NhanVat";

export default function NhanVatTab() {
  
  return (
    <SplitLayout top={<NhanVat/>} bottom={<TuiDoTab/>}/>
  )
}
