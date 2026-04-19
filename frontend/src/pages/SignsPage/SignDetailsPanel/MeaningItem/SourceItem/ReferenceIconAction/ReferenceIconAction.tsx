import BookIcon from "@src/assets/icons/BookIcon"
import LinkIcon from "@src/assets/icons/LinkIcon"
import PersonIcon from "@src/assets/icons/PersonIcon"
import './ReferenceIconAction.css'
import type { IReferenceAttached } from "@src/models/reference.model"

interface ReferenceIconActionProps {
  reference: IReferenceAttached
}

function ReferenceIconAction({reference}: ReferenceIconActionProps): React.JSX.Element {
  const {type, name, url} = reference

  if (type === 'book') return <span className="referenceIcon" title={name}><BookIcon/></span>
  if (type === 'personal') return <span className="referenceIcon" title={name}><PersonIcon/></span>
  if (type === 'url') return <a className="referenceIcon" href={url} target="_blank" title={name}><LinkIcon/></a>

  return <LinkIcon/>
}

export default ReferenceIconAction
