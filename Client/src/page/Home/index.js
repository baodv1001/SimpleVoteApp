import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { BackTop, Card, DatePicker, Divider, List, notification, Skeleton, Tooltip } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../api/userApi';
import { getUser } from '../../redux/actions/auth';
import { getItems } from '../../redux/actions/items';
import { authState$, itemState$ } from '../../redux/selectors';
import styles from './index.module.less';
const Home = props => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [votings, setVotings] = useState([]);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState('');
  const items = useSelector(itemState$);
  const user = useSelector(authState$);
  const [selectedDate, setSelectedDate] = useState(moment());
  const onClickHeart = param => e => {
    if (countVotes(param) === 3) {
      notification.error({
        message: 'Error',
        description: 'You can have 3 votes for one item!',
      });
      return;
    }
    if (moment().format('DD:MM:YYYY') !== selectedDate.format('DD:MM:YYYY')) {
      notification.error({
        message: 'Error',
        description: 'You only can vote item on today!',
      });
      return;
    }
    setLoading(true);
    userApi
      .voting({
        idUser: user.data.IdUser,
        idItem: param,
        voteDate: moment().format('MM/DD/YYYY'),
      })
      .then(res => {
        notification.success({
          message: 'Success',
          description: 'Voting successfully!',
        });
        dispatch(getItems.getItemsRequest());
        dispatch(getUser.getUserRequest(user.data.IdUser));
      })
      .catch(error => {
        notification.error({
          message: 'Error',
          description: 'Error when voting, please try again!',
        });
      });
    // param is the argument you passed to the function
    // e is the event object that returned
  };
  let todayVotes;
  useEffect(() => {
    const idUser = localStorage.getItem('idUser');
    dispatch(getItems.getItemsRequest());
    dispatch(getUser.getUserRequest(idUser));
  }, []);
  useEffect(() => {
    if (items) {
      setData(items);
    }
  }, [items]);
  useEffect(() => {
    if (user.data) {
      setVotings(user.data.Votings);
      setEmail(user.data.Email);
    }
  }, [user]);
  useEffect(() => {
    onChange(moment());
  }, [votings]);
  const countVotes = idItem => {
    const res = votings.filter(vote => vote.IdItem === idItem);
    return res.length;
  };
  const loadMoreData = () => {};

  const onChange = value => {
    setSelectedDate(value);
    let res = [...items];
    if (votings.length > 0 && value) {
      todayVotes = votings.filter(
        voting => moment(voting.VoteDate).format('DD:MM:YYYY') === value.format('DD:MM:YYYY')
      );
      todayVotes.map(vote => {
        let temp = items.find(item => vote.IdItem === item.IdItem);
        const index = res.indexOf(temp);

        temp = {
          isVoted: true,
          ...temp,
        };
        res[index] = temp;
        // res.splice(index, 1);
        // res.push(temp);
      });
    }
    setLoading(false);
    setData(res);
  };
  return (
    <Card>
      <h3>Hi {email}! </h3>
      <DatePicker style={{ marginBottom: '16px' }} value={selectedDate} onChange={onChange} />
      <div id="scrollableDiv" className={styles.scrollable}>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < 10}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv">
          <List
            loading={loading}
            dataSource={data}
            renderItem={item => {
              const heart = item.isVoted ? (
                <HeartFilled style={{ color: 'red' }} />
              ) : (
                <Tooltip title="Voting item">
                  <HeartOutlined onClick={onClickHeart(item.IdItem)} />
                </Tooltip>
              );
              return (
                <List.Item key={item.IdItem}>
                  <List.Item.Meta title={item.Title} description={item.Description} />
                  <div>
                    <span style={{ marginRight: '8px' }}>{item.Votes}</span>
                    {heart}
                  </div>
                </List.Item>
              );
            }}
          />
          <BackTop visibilityHeight="50" target={() => document.getElementById('scrollableDiv')}>
            {/* <div className={styles['back-top']}>UP</div> */}
          </BackTop>
        </InfiniteScroll>
      </div>
    </Card>
  );
};

export default Home;
