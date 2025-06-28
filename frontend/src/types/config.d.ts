/** @format */

export type Social = {
   instagram: string
   facebook: string
   twitter: {
      handle: string
      url: string
   }
}

export type Theme = 'light' | 'dark'

export type Crisp = {
   id?: string
   onlyShowOnRoutes?: string[]
}

export type TeamMember = {
   name: string
   title: string
   email: string
}

export type ConfigProps = {
   supportEmail: string
   author: string
   theme: Theme
   appName: string
   appNameShort: string
   appDescription: string
   domainName: string
   social: Social
   contactNo: string
   mainTel: string
   fax: string
   address: string
   teamMembers: TeamMember[]
}
