CHROME_VERSION=`curl -s https://chromedriver.storage.googleapis.com/LATEST_RELEASE`
#109.0.5414.74

if [ -f ./CHROME_VERSION ]; then
    CHROME_VERSION_INSTALLED=$(<./CHROME_VERSION)
fi


if [ "${CHROME_VERSION_INSTALLED}" != "${CHROME_VERSION}" ]; then
    echo "New version Chrome ${CHROME_VERSION} will be installed.."
    apt-get update -y &&
        apt install -y wget unzip

    apt-get update -y && \
        wget http://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb && \
        apt install -y --no-install-recommends ./google-chrome-stable_${CHROME_VERSION}-1_amd64.deb && \
        wget https://chromedriver.storage.googleapis.com/${CHROME_VERSION}/chromedriver_linux64.zip && \
        unzip -uo chromedriver_linux64.zip && \
        chmod +x chromedriver && \
        mv -u chromedriver /usr/bin && \
        rm -f google-chrome-stable_current_amd64.deb chromedriver_linux64.zip

    echo ${CHROME_VERSION} > ./CHROME_VERSION
else
    echo "Chrome version ${CHROME_VERSION} is already installed.."
fi
