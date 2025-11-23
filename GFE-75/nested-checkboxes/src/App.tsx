import Checkboxes from "./components/checkboxes/Checkboxes";
import { CHECKBOXES_DATA } from "./constants/constants";

function App() {
  return (
    <div>
      <Checkboxes defaultCheckboxData={CHECKBOXES_DATA} />
    </div>
  );
}

export default App;
