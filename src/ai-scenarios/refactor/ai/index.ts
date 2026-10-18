// Imports
import { predict } from './predict';
import { predictSu } from './predict_su';
import { predictSuT } from './predict_su_t';
import { specToTool } from './spec_to_tool';
import { toolPredict } from './tool_predict';

// Named exports
export {
  predict,
  predictSu,
  predictSuT,
  specToTool,
  toolPredict
};

// Default export
const ai = {
  predict,
  predictSu,
  predictSuT,
  specToTool,
  toolPredict,
};

export default ai;
