def synchronized(f):
    def newFunction(*args, **kw):
        self = args[0]
        self._lock.acquire()
        try:
            return f(*args, **kw)
        finally:
            self._lock.release()

    return newFunction
