      function xxx(){
          console.log(1)
          setTimeout(xxx,2000)
      }
      setTimeout(xxx,2000)

      setInterval(function(){
          console.log(2)
      },2000)

      //setInterval 是持续占有独立线程的一个定时触发函数！
     // 嵌套setTimeout，实现的功能和前者一样！但是不会持续占有一个线程的资源，执行完当前的方法，
     //会释放当然的线程资源，等待下次触发，会重新申请资源！