#!/bin/bash
 
JAVA_HOME=/opt/pms-tool/jdk1.7.0_79
 
JAVA=$JAVA_HOME/bin/java
 
nohup $JAVA -jar PMS-tool.jar -Djava.ext.dirs=$JAVA_HOME/lib &
