/**
 * Pseudo APIs
 */

import { ITelematicData } from "../interfaces/ITelematicData";

import { mocked_telematicData } from "./data";

const FAKE_API_DELAY: number = 2e3;

export const fetchAllData = async (): Promise<Array<ITelematicData>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mocked_telematicData);
    }, FAKE_API_DELAY);
  });
};

// export const fetchUpdate = async (): Promise<IApiState<Array<IHobby>>> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         status: "success",
//         data: MOCK_HOBBIES,
//       });
//     }, FAKE_API_DELAY);
//   });
// };
