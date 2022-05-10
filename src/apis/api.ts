/**
 * Pseudo APIs
 */

import { mocked_telematicData } from "./data";

const FAKE_API_DELAY: number = 2e3;

export const fake_fetch = async <T>(
  url: string,
  method: string
): Promise<T> => {
  return new Promise((resolve) => {
    console.log(url);

    if (url.startsWith(`${process.env.REACT_APP_BACKEND_URL}/:`)) {
      const param = url.substring(url.indexOf("/:") + 2);
      console.log(param);
      setTimeout(() => {
        resolve(
          mocked_telematicData.find(
            (datum) => datum.EquipmentHeader.SerialNumber === param
          ) as any
        );
      }, FAKE_API_DELAY);
    }
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
