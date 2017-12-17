// TODO: Extract PlaygroundContact to its own database object
export interface Playground extends PlaygroundContact {
  id: string;

  title: string;
  address: string;
  text: string;

  imageUrls: string[];
  sports: Record<string, boolean>;
  needs: Record<string, boolean>;
  geo: google.maps.LatLngLiteral;

  created: number;
  createdBy: string;
  status: string;
}

interface PlaygroundContact {
  name: string;
  email: string;
  createdBy: string;
}
