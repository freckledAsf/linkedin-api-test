export type DateDTO = {
  month: number;
  day: number;
  year: number;
};

export type Location = {
  country: string;
  short: string;
  city: string;
  state: string;
  default: string;
};

export type Locale = {
  country: string;
  language: string;
};

export type ProfileLanguage = {
  name: string;
  proficiency: string;
};

export type Education = {
  date: {
    start: DateDTO;
    end: DateDTO;
  };
  school: {
    name: string;
    logo: string;
    url: string;
  };
  degree_name: string;
  field_of_study: string;
  grade: string;
};

export type Certification = {
  name: string;
  date: {
    start: DateDTO;
    end: DateDTO;
  };
  authority: string;
  url: string;
  license_number: string;
  display_source: string;
  company: {
    id: number;
    name: string;
    logo: string;
    url: string;
  };
};

export type Website = {
  type: string;
  url: string;
};

export type PhoneNumber = {
  number: string;
  type: string;
};

export type Experience = {
  company: string;
  company_id: string;
  company_linkedin_url: string;
  company_logo_url: string;
  current_company_join_month: string;
  current_company_join_year: string;
  date_range: string;
  description: string;
  duration: string;
  end_month: string;
  end_year: string;
  is_current: boolean;
  location: string;
  start_month: string;
  start_year: string;
  title: string;
};

export type Profile = {
  profile_id: string;
  first_name: string;
  last_name: string;
  sub_title: string;
  profile_picture: string;
  background_image: string;
  profile_type: string;
  entity_urn: string;
  object_urn: string;
  birth_date: DateDTO;
  summary: string;
  location: Location;
  industry: string;
  skills: string[];
  languages: {
    primary_locale: Locale;
    supported_locales: Locale[];
    profile_languages: ProfileLanguage[];
  };
  education: Education[];
  certifications: Certification[];
  contact_info: {
    websites: Website[];
    email: string;
    twitter: string;
    phone_numbers: PhoneNumber[];
  };
};
