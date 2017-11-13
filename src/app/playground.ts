export interface Playground {
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
