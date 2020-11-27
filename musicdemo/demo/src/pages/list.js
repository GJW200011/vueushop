import react from "react";
import qsString from "querystring";
import { playDetail } from "../util/axios/index";

// 引入css
import "../assets/css/list.css";

class Home extends react.Component {
    constructor() {
        super();
        this.state = {
            playList: {},
            songList: [],
        };
    }
    //挂载
    componentDidMount() {
        let query = this.props.location.search.slice(1);
        console.log(query, "路由属性");
        //组件一加载调取歌单详情接口
        playDetail({
            id: qsString.parse(query).id,
        }).then((res) => {
            console.log(res);
            if (res.code == 200) {

                this.setState({

                    playList: res.playlist,
                    songList: res.playlist.tracks,
                });
            }
        });
    }
    //跳转播放页面
    toPlay(id) {
        this.props.history.push(`/play?id=${id}`)
    }
    render() {
        const { playList, songList } = this.state;
        return (
            <div className="list">
                <div className="top" style={{ background: `url(${playList.coverImgUrl})` }}>
                    <div className="left">
                        <img src={playList.coverImgUrl}></img>
                        <span className='ear'>{playList.playCount > 10000 ? (playList.playCount / 10000).toFixed(1) : playList.playCount}万</span>
                        <span className='lsthd_icon'>歌单</span>
                    </div>
                   
                    <div className="right">
                        <h3>{playList.name}</h3>
                        <div className="nick">
                            <img src={playList.creator ? playList.creator.avatarUrl : ''}></img>
                            <p>{playList.creator ? playList.creator.nickname : ''}</p>
                        </div>
                    </div>
                </div>
                <div className="song">
                    <h3>歌曲列表</h3>
                    <ul className="songList">
                        {songList.map((item, idx) => {
                            return (
                                <li key={item.id} onClick={this.toPlay.bind(this, item.id)}>
                                    <h4>
                                        {item.name}
                                        <span style={{ color: "#ccc" }}>
                                            {" "}
                                            {item.alia.length > 0 ? `(${item.alia[0]})` : ""}
                                        </span>
                                    </h4>
                                    <p>
                                        {item.ar.map((ar) => {
                                            return <span key={ar.id}>{ar.name}</span>;
                                        })}
                 {item.al.name==''? '':'-'} <span>{item.al.name}</span>
                                    </p>
                                    <span className="player"></span>
                                    <i className="numGray">{idx + 1} </i>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="store">
                        <div>收藏歌单</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
