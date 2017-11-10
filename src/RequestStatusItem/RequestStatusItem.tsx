import { Properties } from 'compote/html';
import { FactoryComponent } from 'mithril';

import { RequestStatus as RequestStatusType, getStatusClass, getStatusText } from '../request';

interface Attrs extends Properties<HTMLDivElement> {
  status: RequestStatusType;
}

export const RequestStatusItem: FactoryComponent<Attrs> = ({ attrs: { status, ...attrs } }) => ({
  view: () =>
    <div {...attrs} class={`br-md pa-sm ${attrs.class || ''} ${getStatusClass(status)}`}>
      {getStatusText(status)}
    </div>
});
