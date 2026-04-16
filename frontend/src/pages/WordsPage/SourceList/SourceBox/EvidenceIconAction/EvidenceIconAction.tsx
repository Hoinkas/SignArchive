import BookIcon from "@src/assets/icons/BookIcon"
import LinkIcon from "@src/assets/icons/LinkIcon"
import PersonIcon from "@src/assets/icons/PersonIcon"
import type { IEvidenceAttached } from "@src/models/evidence.model";
import './EvidenceIconAction.css'

interface EvidenceIconActionProps {
  evidence: IEvidenceAttached
}

function EvidenceIconAction({evidence}: EvidenceIconActionProps): React.JSX.Element {
  const type = evidence.type;
  const name = evidence.fullName;

  if (type === 'książka') return <span className="evidenceIcon" title={name}><BookIcon/></span>
  if (type === 'osobiste') return <span className="evidenceIcon" title={name}><PersonIcon/></span>
  if (type === 'url') return <a className="evidenceIcon" href={evidence.url} target="_blank"><LinkIcon/></a>

  return <LinkIcon/>
}

export default EvidenceIconAction
