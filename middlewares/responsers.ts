import {
  Context,
} from "../deps.ts";

export async function dataOrMessage(ctx: Context, next: () => Promise<void>) {
  const { state, response } = ctx;
  state.success = false;
  await next();
  if (state.success || state.data) {
    response.status = 200;
    response.body = {
      success: true,
      data: state.data,
    };
    delete state.data;
  } else {
    response.status = 400;
    response.body = {
      success: false,
      message: `${state.message}` || "",
    };
    delete state.message;
  }
  delete state.success;
}
