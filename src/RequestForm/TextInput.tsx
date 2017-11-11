import { set } from 'compote/components/utils';
import { withAttr } from 'mithril';

import { Request } from '../Request/Request';

export const TextInput: FnComponent = ({ attrs: { request } }) => {
  const setText = withAttr('value', set<Request>('text')(request));

  return {
    view: () => (
      <textarea
        class="form-input"
        name="text" placeholder="От какво имате нужда?" rows="15"
        value={request.text} oninput={setText}
      />
    )
  };
};
