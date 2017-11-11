export interface Playground {
  imageUrls: string[];

  title: string;
  text: string;
  geo: google.maps.LatLngLiteral;
  created: number;
  createdBy: string;
  status: string;
}
