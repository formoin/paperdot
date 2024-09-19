import React from 'react';
import styles from './Login.module.scss';
import imgLogin from '../assets/images/ImgLogin.jpg';

const Login: React.FC = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <img
          src={imgLogin}
          alt="Login background"
          className={styles.loginImg}
        />
      </div>
      <div className={styles.loginRight}>
        <h1 className={styles.loginTitle}>PAPER.</h1>
        <form className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              placeholder="ID"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pw">PW</label>
            <input
              type="password"
              id="pw"
              placeholder="PW"
            />
          </div>
          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.signupBtn}
            >
              회원 가입
            </button>
            <button
              type="submit"
              className={styles.loginBtn}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
