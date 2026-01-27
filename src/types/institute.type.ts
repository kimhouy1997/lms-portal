export interface InstituteInterface {
  id: string;
  name: string;
  slug: string;
  status: 'active' | 'suspended';
  ownerName: string;
  totalDepartments: number;
  totalUsers: number;
  logo?: string;
  domain?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  website?: string;
  timezone?: string;
  language?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInstituteRequest {
  name: string;
  slug: string;
  logo?: string;
  domain?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  website?: string;
  timezone?: string;
  language?: string;
  status: 'active' | 'suspended';
}

export type UpdateInstituteRequest = Partial<CreateInstituteRequest> & { id: string };
