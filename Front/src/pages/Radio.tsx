import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChatRoom from '../components/chat/ChatRoom';
import Header from '../components/common/Header';
import PlayList from '../components/radio/PlayList';
import RadioScript from '../components/radio/RadioScript';
import styles from './Radio.module.scss';
import Hls from 'hls.js';
const Radio = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [isMuted, setIsMuted] = useState(false);
  const handleReplayMove = () => {
    navigate(`/replay/${Number(id)}`);
  };

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (Hls.isSupported() && audioRef.current) {
      const hls = new Hls();
      const m3u8Url = `http://localhost:8080/api/stream/playlist_${id}.m3u8`; // 서버에서 제공하는 M3U8 파일 URL

      hls.loadSource(m3u8Url);
      hls.attachMedia(audioRef.current);

      // 플레이리스트가 파싱되면 오디오 재생
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        audioRef.current?.play();
      });

      return () => {
        hls.destroy();
      };
    }
  }, []);
  return (
    <>
      <Header />
      <div className={`${styles.container}`}>
        <div className="flex flex-row gap-7 items-center">
          <div className={`${styles.title}`}>인문/사회</div>{' '}
          <button
            className={`${styles.reply_button}`}
            onClick={() => handleReplayMove()}
          >
            다시보기
          </button>
        </div>
      </div>

      <div className={`${styles.content}`}>
        <div className={`${styles.radio}`}>
          <PlayList />
          <RadioScript className="mt-4" />
        </div>
        <ChatRoom className="mt-4" />
      </div>
      <audio
        ref={audioRef}
        controls
        style={{ width: 0, height: 0 }}
      />
    </>
  );
};

export default Radio;