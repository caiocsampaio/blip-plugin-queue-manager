import blipServices from 'api/blipServices';
import constants from 'api/constants';
import iframeServices from 'api/iframeServices';

const defaultQueue = {
  id: "wppsaquenaologado",
  ownerIdentity: "bmgtransbordo2prod@msging.net",
  name: "WppSaqueNaoLogado",
  isActive: true,
  storageDate: "2021-05-31T14:30:25.270Z",
  Priority: 0,
};

 

jest.mock('api/iframeServices', () => jest.fn());
iframeServices.setQueue = jest.fn(async () => true)
iframeServices.getResource = jest.fn(async () => constants.defaultResource.wppsaquenaologado)

describe("Blip Services", () => {
  it("should set queue", async () => {
    const response = await blipServices.setQueue(defaultQueue)
    expect(response).toBe(true);
  })

  it("should change queue status", async () => {
    const response = await blipServices.changeQueueStatus(true, defaultQueue)
    expect(response).toBe(true);
  })

  it("should get queue resource", async () => {
    const response = await blipServices.getQueueResource();
    expect(response).toBe(constants.defaultResource.wppsaquenaologado);
  })

  it("should set resource successfully", async () => {
    iframeServices.setResource = jest.fn(async () => "")
    const response = await blipServices.setQueueResource("");
    expect(response != null).toBeTruthy()
  })

  it("should set resource with error", async () => {
    iframeServices.setResource = jest.fn(async () => { throw new Error("test error") })
    const response = await blipServices.setQueueResource("");
    expect(response).toBeNull()
  })
})