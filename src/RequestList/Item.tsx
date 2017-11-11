import { Timeago } from 'compote/components/timeago';

import { Image } from '../Image/Image';
import { Request } from '../Request/Request';
import { RequestStatusItem } from '../RequestStatusItem/RequestStatusItem';
import { route, Routes } from '../router';

interface Attrs {
  request: Request;
}

export const RequestListItem: FnComponent<any, any> = () => ({
  view: ({ attrs: { request } }: { attrs: Attrs }) =>
    <a
      class="request-list-item pa-md align-items-start fade-in-animation"
      oncreate={route.link} href={Routes.REQUEST_DETAILS(request.id)}
    >
      <Image class="br-md" src={request.imageUrls && request.imageUrls[0] || 'default.png'} />
      <div>
        <h4>{request.title}</h4>
        <div class="mb-xs">{request.text}</div>
        {Timeago(new Date(request.created as number))}
      </div>
      <RequestStatusItem status={request.status} />
    </a>
});
