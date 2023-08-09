export type Student= {
  fname: string;
  lname: string;
  email: string;
  birthdate: Date;
  gender: 'male' | 'female';
  country: string;
  readonly _id:string;
}
