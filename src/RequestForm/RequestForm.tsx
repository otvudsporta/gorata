import '../assets/map_marker_new.svg';
import './style.scss';

import { flex } from 'compote/components/flex';
import { constant } from 'compote/components/utils';
import * as m from 'mithril';
import { FactoryComponent } from 'mithril';

import { Request } from '../Request/Request';

import { AddressInput } from './AddressInput';
import { Images } from './Images';
import { TextInput } from './TextInput';
import { SubmitButton } from './SubmitButton';

export interface State {
  request: Request;
  requestMarker: google.maps.Marker;
  addressSuggestion: string;
  loading: boolean;
}

// TODO: Use form data
// TODO: Add validation
export const RequestForm: FactoryComponent<State> = () => {
  const state = {
    request: { imageUrls: [] } as Request
  } as State;

  return {
    view: () =>
      <div class="flex-row justify-content-stretch align-items-stretch container fade-in-animation">
        <form class="form" style={flex(1)} onsubmit={returnFalse}>
          <fieldset class="form-panel lg" disabled={state.loading === true}>
            {Images(state.request.imageUrls)}
            {m(AddressInput, { state: state })}
            <br /><br />
            {m(TextInput, { request: state.request })}
            <br /><br />
            {m(SubmitButton, { state: state })}
          </fieldset>
        </form>
      </div>
  };
};

const returnFalse = constant(false);
