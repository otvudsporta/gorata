import { Properties } from 'compote/html';
import { Timeago } from 'compote/components/timeago';
import { flex } from 'compote/components/flex';
import * as m from 'mithril';
import { FactoryComponent, redraw, withAttr } from 'mithril';

import { Image } from '../Image/Image';
import * as notify from '../notify';
import { Request, RequestStatus, RequestServices, requestStatuses, getStatusText } from '../Request/Request';
import { RequestStatusItem } from '../RequestStatusItem/RequestStatusItem';
import { store } from '../store';
import { UserProfile, canModerate, UserServices } from '../User/User';
import { UserProfileImage } from '../UserProfileImage/UserProfileImage';

interface State extends Properties<HTMLDivElement> {
  request: Request;
  createdBy?: UserProfile;
  isRequestStatusBeingEdited?: boolean;
}

export const RequestDetails: FactoryComponent<State> = ({ attrs }) => {
  const state: State = {
    request: attrs.request
  };

  loadCreatedBy(state, state.request.createdBy);

  const setRequestStatusToValue = withAttr('value', setRequestStatus(state));
  const startEditingRequestStatus = () => { state.isRequestStatusBeingEdited = true; };
  const stopEditingRequestStatus = () => { state.isRequestStatusBeingEdited = false; };

  return {
    view() {
      const { currentUser } = store.getState();
      const { request, createdBy, isRequestStatusBeingEdited } = state;

      return (
        <div>
          {request.imageUrls && request.imageUrls.length > 0 ?
            request.imageUrls.map((imageUrl) => <Image src={imageUrl} />)
            :
            <Image src="default.png" />
          }
          <div class="pa-md">
            <div class="flex-row justify-content-center align-items-start">
              <h4 style={flex(1)}>{request.title}</h4>
              {canModerate(currentUser) ?
                <div class="flex-row justify-content-center align-items-center">
                  {isRequestStatusBeingEdited ?
                    [
                      <select class="br-md pa-sm" onchange={setRequestStatusToValue} value={request.status}>
                        {requestStatuses.map(RequestStatusOption)}
                      </select>
                      ,
                      <div class="pointer mr-n-md pa-md unselectable" onclick={stopEditingRequestStatus}>✖️</div>
                    ]
                    :
                    [
                      <RequestStatusItem status={request.status} />
                      ,
                      <div class="pointer mr-n-md pa-md unselectable" onclick={startEditingRequestStatus}>✏️</div>
                    ]
                  }
                </div>
                :
                <RequestStatusItem status={request.status} />
              }
            </div>
            <div class="mb-md">{request.text}</div>
            {createdBy ? Created(request, createdBy) : null}
          </div>
        </div>
      );
    }
  };
};

const loadCreatedBy = async (state: State, userId: string) => {
  try {
    state.createdBy = await UserServices.getProfile({ userId });
    redraw();
  }
  catch (error) {
    notify.error(error);
  }
};

const setRequestStatus = (state: State) => async (status: RequestStatus) => {
  const { request } = state;
  const previousStatus = request.status;
  request.status = status;
  state.isRequestStatusBeingEdited = false;

  try {
    await RequestServices.setStatus({ requestId: request.id }, request.status);
  }
  catch (error) {
    request.status = previousStatus;
    state.isRequestStatusBeingEdited = true;
    redraw();

    notify.error(error);
  }
};

const RequestStatusOption = (status: RequestStatus) => <option value={status}>{getStatusText(status)}</option>;

const Created = (request: Request, createdBy: UserProfile) => (
  <div class="flex-row align-items-center">
    {UserProfileImage({ class: 'width-xxs height-xxs mr-sm', profile: createdBy })}
    {createdBy.name}
    <div style={flex(1)}></div>
    {Timeago(new Date(request.created as number))}
  </div>
);
