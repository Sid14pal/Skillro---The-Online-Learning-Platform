export interface Student {
    id: string;
    name : string;
    category : string;
    duration : string;
    price: string;
    imageUrl?: string;
    videoUrl?: string;  
}

export interface courses {
    id: string;
    courseName : string;
    courseId : string;
    duration : string;
    courseClass: string;
    imageUrl?: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
}

export interface checkout {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  paymentCard: string;
  cardNumber: string;
  month: string;
  year: string;
  cvv: string;
  date: string;
}