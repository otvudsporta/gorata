import './style.scss';

import { div } from 'compote/html';
import * as m from 'mithril';
import { FactoryComponent } from 'mithril';

import { requestStatuses } from '../Request/Request';
import { Actions, store, RequestsFilter } from '../store';

import { RequestListStatusFilterItem } from './StatusFilterItem';
import { RequestListItem } from './Item';

interface Attrs {
  requestsFilter: RequestsFilter;
}

const state: Attrs = {
  requestsFilter: { key: 'status', value: 'new' }
};

export const RequestList: FactoryComponent<Attrs> = () => {
  store.dispatch({ type: Actions.GET_REQUESTS, filter: state.requestsFilter });

  return {
    view() {
      const { requests } = store.getState();
      return [
        // Status Filter
        div({ class: 'request-list-status-filter flex-row justify-content-space-around align-items-center ph-sm pv-md sticky top-0 bg-neutral-lighter' },
          [...requestStatuses, null].map((requestStatus) => m(RequestListStatusFilterItem, {
            key: requestStatus,
            parent: state,
            status: requestStatus
          }))
        ),
        // List Items
        requests.map((request) => m(RequestListItem, { key: request.id, request }))
      ];
    }
  };
};
