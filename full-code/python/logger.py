import os

os.remove('logs/log.txt')


def log_msg(msg: str) -> bool:
    with open('logs/log.txt', 'a') as f:
        f.write(msg + '\n')
        f.flush()
        f.close()
        return True


def clear_log():
    with open('logs/log.txt', 'w') as f:
        f.write('')
        f.flush()
        f.close()
        return True
