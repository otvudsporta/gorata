import { getStatusClass, getStatusText } from '../Request/Request';

export const RequestStatusItem: FnComponent = ({ attrs: { status, ...attrs } }) => ({
  view: () =>
    <div {...attrs} class={`br-md pa-sm ${attrs.class || ''} ${getStatusClass(status)}`}>
      {getStatusText(status)}
    </div>
});
