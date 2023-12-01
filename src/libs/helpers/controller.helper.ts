class ControllerHelper {
  async getResponse(event: any) {
    const data: responseInterface = await event.then((res: JSON) => {
      const response: responseInterface = {
        statusCode: 200,
        body: res,
      };

      return response;
    })
      .catch((err: JSON) => {
        const response: responseInterface = {
          statusCode: 400,
          body: err,
        };

        return response;
      });

    return data;
  }
}

export default new ControllerHelper();
