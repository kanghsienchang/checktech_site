#!/bin/bash

TYPE=$1
BRANCH=main
REPO_URL=https://github.com/kanghsienchang/checktech_i18n.git
REPO_FOLDER=/site
REPO_NAME=checktech_i18n
REPO_DIR=${PWD}/${REPO_NAME}
DESTINATION_DIR=${PWD}/i18n


function checkIfConflictedFiles() {
  # Check if there are conflicted files
  if [[ $(git diff --check | wc -l) -gt 0 ]]; then
    echo "There are conflicted files, please resolve it!"
    exit 1
  fi
}

if [[ "${TYPE}" = 'reset' ]]; then
  rm -rf ${REPO_NAME}
  rm -r ${DESTINATION_DIR}/*.json
elif [[ "${TYPE}" = 'init' ]]; then
  if [[ -d "$REPO_DIR" ]]; then
    echo "${REPO_NAME} already set up! If update does not work, please reset it."
    exit 0
  fi
  echo "Cloning ${REPO_NAME}..."
  git clone ${REPO_URL} --branch ${BRANCH} --single-branch
  echo "${REPO_NAME} cloned"
  echo "Copy translations..."
  cp $REPO_DIR${REPO_FOLDER}/*.json ${DESTINATION_DIR}
  echo "Translations copied"
elif [[ "${TYPE}" = 'update' ]]; then
  # If no repo found, clone it
  if [[ ! -d "$REPO_DIR" ]]; then
    echo "Repo not yet setup, please initialize it!"
    exit 1
  fi
  cd ${REPO_NAME}
  echo "Fetching newest ${REPO_NAME}..."
  git fetch --quiet
  cp ${DESTINATION_DIR}/*.json $REPO_DIR${REPO_FOLDER}
  checkIfConflictedFiles
  # Check if there are uncommited changes
  if ! git diff-index --quiet HEAD --; then
    # If there are changes, commit, merge and push
    echo "There are changes in ${REPO_NAME}!"
    git add .
    read -p "Commit message: " commitMsg
    git commit -m "${commitMsg}"
    git merge
    checkIfConflictedFiles
  else
    # If there are no changes, just merge
    echo "There are no changes, updating ${REPO_NAME}..."
    git merge
    cp $REPO_DIR${REPO_FOLDER}/*.json ${DESTINATION_DIR}
  fi
  # Check if there are changes to push
  if [[ $(git rev-list --count '@{u}..HEAD') -gt 0 ]]; then
    echo "Pushing to ${REPO_NAME}!"
    git push
  fi
fi
