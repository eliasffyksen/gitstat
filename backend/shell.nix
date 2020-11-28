{ pkgs ? import <nixpkgs> {} }:

(pkgs.buildFHSUserEnv {
  name = "gitstat-setup";
  targetPkgs = pkgs: (with pkgs; [ libgit2 nodejs-12_x krb5 pcre e2fsprogs ]);
  runScript = "bash";
}).env
