import socket

def get_ip_address():
    my_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        my_sock.connect(("10.255.255.255", 1))
        my_ip = my_sock.getsockname()[0]
    except:
        my_ip = "0.0.0.0"
    finally:
        my_sock.close()
    return my_ip