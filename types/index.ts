export type Education = {
  activities: string;
  date_range: string;
  degree: string;
  description: string;
  eduId: string;
  end_month: string;
  end_year: string;
  field_of_study: string;
  grade: string;
  school: string;
  school_id: string;
  school_linkedin_url: string;
  start_month: string;
  start_year: string;
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
  about: string;
  city: string;
  company: string;
  company_domain: string;
  company_employee_range: string;
  company_industry: string;
  company_linkedin_url: string;
  company_logo_url: string;
  company_website: string;
  company_year_founded: string;
  connections_count: string;
  country: string;
  current_company_join_month: string;
  current_company_join_year: string;
  educations: Education[];
  experiences: Experience[];
  first_name: string;
  followers_count: number;
  full_name: string;
  headline: string;
  hq_city: string;
  hq_country: string;
  hq_region: string;
  job_title: string;
  last_name: string;
  linkedin_url: string;
  location: string;
  profile_id: string;
  profile_image_url: string;
  public_id: string;
  school: string;
  skills: string;
  state: string;
};
