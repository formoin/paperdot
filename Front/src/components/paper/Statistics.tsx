import React from 'react';
import GenderRatio from './GenderRatio';
import styles from './Statistics.module.scss';
import Age from './Age';
import Degree from './Degree';
import useTheme from '../../zustand/theme';

const Statistics: React.FC = () => {
  const isDarkMode = useTheme((state) => state.isDarkMode);
  return (
    <div className={styles.statistics}>
      <div className={`${styles.title} ${isDarkMode ? styles.darkLine : ''}`}>
        <strong className="text-lg">논문 사용자 통계</strong>
      </div>
      <div className={`${styles.graphArea} text-light-text`}>
        <div className={styles.graph}>
          <div className={styles.graphTitle}>성별 분포</div>
          <GenderRatio />
        </div>
        <div className={styles.graph}>
          <div className={styles.graphTitle}>연령대 분포</div>
          <Age />
        </div>
        <div className={styles.graph}>
          <div className={styles.graphTitle}>학력 분포</div>
          <Degree />
        </div>
      </div>
    </div>
  );
};

export default Statistics;