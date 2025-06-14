import { useParams } from "react-router-dom";

export default function ConsultantDetail() {
    const {id} = useParams();

  return (
    <div>ConsultantDetail - {id}</div>
  )
}
