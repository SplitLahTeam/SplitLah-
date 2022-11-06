import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import profile from "../images/profile.png";
import {useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectedGroupActions } from "../store/selectedGroupSlice";
import {groupSummaryActions} from '../store/groupSummarySlice'
import CardIndividualGroup from "../components/CardIndividualGroup";

const UserGroupsSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGroups = useSelector((state) => state.userSummary.groupList);
  const groupsSummaryList = useSelector((state) => state.groupSummary)

  useEffect(()=>{
    fetch(('/api/groups/summary'))
    .then((res)=>{
      if (res.status !==200){
        throw new Error({msg:"Some comm error"})
        return
      }
      return res.json()
    })
    .then((data)=>{
      console.log(data)
      dispatch(groupSummaryActions.updateGroupSummary(data))
    })
  },[])

  const handleGroupClick = (groupId) => {
    return () => {
      fetch("/api/groups/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupId }),
      })
        .then((res) => {
          console.log(res);
          if (res.status !== 200) {
            throw new Error({ msg: "Some comm error" });
          }
          return res.json();
        })
        .then((data) => {
          // console.log(data)
          dispatch(
            selectedGroupActions.updateSelectedGroup({
              groupId,
              name: data.name,
              description: data.description,
              userList: data.userDetails,
              netAmount: data.netAmount
            })
          );
          navigate("/detailedpages/group/details");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  };

  return (
    <div>
      <div className="groups-head">
        <Image src={profile} style={{ width: "100px", borderRadius: "50%" }} />
        <h1>My Groups</h1>
        <p className="text-muted">List of groups that you're in</p>
        <Button onClick={() => navigate("/group/register")} variant="primary">
          Create Group
        </Button>
      </div>
      <hr className="divider"></hr>
      <div className="group-cluster">
        {groupsSummaryList.map((group) => (
          <CardIndividualGroup
            key={group.id}
            groupName={group.name}
            amountToReceive = {group.amountToReceive}
            groupClick={handleGroupClick(group.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserGroupsSummary;
