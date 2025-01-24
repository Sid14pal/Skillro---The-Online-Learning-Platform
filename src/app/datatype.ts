export interface Student {
    id: string;
    name : string;
    email : string;
    roll : string;
    class: string;
    mobile: string;
    bloodgroup: string;
    address: string;
    gender: string;
    birthDay: string;
    imageUrl?: string;
}

export interface courses {
    id: string;
    course : string;
    code : string;
    description : string;
    department: string;
    duration: string;
    imageUrl?: string;
}