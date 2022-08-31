import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Table, Button } from 'react-bootstrap';
import './missions.css';
import { getMissions, joinMissions, leaveMissions } from '../../redux/missions/mission';

const Missions = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMissions());
  }, []);

  const onClickJoinMissions = (e) => {
    e.preventDefault();
    dispatch(joinMissions(e.target.parentNode.parentNode.id));
  };

  const onClickLeaveMissions = (e) => {
    e.preventDefault();
    dispatch(leaveMissions(e.target.parentNode.parentNode.id));
  };

  const missions = useSelector((state) => state.missions);
  return (
    <>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id} id={mission.mission_id}>
              <td>{mission.mission_name}</td>
              <td>{mission.description}</td>
              <td className="my-buttons">
                {!mission.reserved && (<Button variant="secondary">NOT A MEMBER</Button>)}
                {mission.reserved && (<Button>Active Member</Button>)}
              </td>
              <td className="my-buttons">
                {!mission.reserved && (<Button variant="outline-secondary" onClick={onClickJoinMissions}>Join Mission</Button>)}
                {mission.reserved && (<Button variant="outline-danger" onClick={onClickLeaveMissions}>Leave Mission</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default Missions;
