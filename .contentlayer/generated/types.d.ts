// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer2/core'
import * as Local from 'contentlayer2/source-files'

export { isType } from 'contentlayer2/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type Doc = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Doc'
  title: string
  description: string
  published: boolean
  author: string
  featured: boolean
  tldr?: string | undefined
  podcastUrl?: string | undefined
  minis: boolean
  publishedAt: IsoDateTimeString
  updatedAt: IsoDateTimeString
  tags: string[]
  /** MDX file body */
  body: MDX
  slug: string
  slugAsParams: string
}

export type Link = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Link'
  platform: string
  url: string
  alias: string
  /** Markdown file body */
  body: Markdown

}

export type Profile = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Profile'
  username: string
  formalImage: string
  profileImage: string
  fullName: string
  headline: string
  blogHeadline: string
  links?: Link[] | undefined
  role: string
  company: string
  /** MDX file body */
  body: MDX

}

export type Project = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Project'
  title: string
  description: string
  github: string
  liveUrl: string
  featured: boolean
  technologies: string[]
  /** MDX file body */
  body: MDX
  slug: string
  slugAsParams: string
}  

/** Nested types */
export type Link = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Link'
  platform: string
  url: string
  alias: string

}  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = Doc | Link | Profile | Project
export type DocumentTypeNames = 'Doc' | 'Link' | 'Profile' | 'Project'

export type NestedTypes = Link
export type NestedTypeNames = 'Link'

export type DataExports = {
  allDocuments: DocumentTypes[]
  allDocs: Doc[]
  allProjects: Project[]
  allProfiles: Profile[]
  allLinks: Link[]
}


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
  dataExports: DataExports
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Doc: Doc
  Link: Link
  Profile: Profile
  Project: Project
}

export type NestedTypeMap = {
  Link: Link
}

 