import { FactoryComponent } from 'mithril';

import { RequestStatus, getStatusText } from '../Request/Request';
import { store, Actions, RequestsFilter } from '../store';

interface State {
  parent: {
    requestsFilter: RequestsFilter;
  };
  status: RequestStatus;
}

export const RequestListStatusFilterItem: FactoryComponent<State> = ({ attrs }) => {
  const state: State = {
    parent: attrs.parent,
    status: attrs.status
  };

  return {
    view: () =>
      <h5
        class={`
          request-list-status-filter-item br-md pv-sm ph-md pointer text-capitalize fade-animation
          ${getFilterItemActiveClass(state)}
        `}
        onclick={setStatusFilter(state)}
      >
        {getStatusText(state.status, 'many') || 'всички'}
      </h5>
  };
};

const getFilterItemActiveClass = ({ parent: { requestsFilter }, status }: State) => {
  if (requestsFilter == null && status == null) return 'active';
  return requestsFilter && requestsFilter.key === 'status' && requestsFilter.value === status ? 'active' : '';
};

const setStatusFilter = ({ parent, status }: State) => () => {
  parent.requestsFilter = { key: 'status', value: status };
  store.dispatch({ type: Actions.GET_REQUESTS, filter: parent.requestsFilter });
};
